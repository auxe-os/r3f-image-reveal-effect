import { useState } from 'react';
import { testImageLoad, validateImageDimensions, getFormatRecommendations } from '../utils/imageFormatTester';

/**
 * Image Format Testing Component
 * 
 * This component demonstrates how to test and validate images
 * for use with the R3F Image Reveal Effect.
 */
const ImageFormatTester = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Example images to test (add your own here)
  const testImages = [
    './img/textureupscaled.webp',
    // Add more test images here:
    // './img/example.jpg',
    // './img/example.png',
  ];

  const runImageTest = async (imagePath) => {
    setLoading(true);
    try {
      const result = await testImageLoad(imagePath);
      const validation = validateImageDimensions(result.width, result.height);
      
      const testResult = {
        ...result,
        validation,
        status: 'success',
        fileExtension: imagePath.split('.').pop().toLowerCase()
      };
      
      setTestResults(prev => [...prev, testResult]);
    } catch (error) {
      const errorResult = {
        path: imagePath,
        status: 'error',
        error: error.error || error.message,
        fileExtension: imagePath.split('.').pop().toLowerCase()
      };
      
      setTestResults(prev => [...prev, errorResult]);
    }
    setLoading(false);
  };

  const runAllTests = async () => {
    setTestResults([]);
    setLoading(true);
    
    for (const imagePath of testImages) {
      await runImageTest(imagePath);
    }
    
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const formatRecommendations = getFormatRecommendations();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Image Format Tester</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Test Images</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={runAllTests}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test All Images'}
          </button>
          <button
            onClick={clearResults}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear Results
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Or test a specific image:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedImage}
              onChange={(e) => setSelectedImage(e.target.value)}
              placeholder="./img/your-image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => selectedImage && runImageTest(selectedImage)}
              disabled={loading || !selectedImage}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Test
            </button>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Test Results</h3>
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded border ${
                  result.status === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{result.path}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      result.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.status === 'success' ? 'SUCCESS' : 'ERROR'}
                  </span>
                </div>
                
                {result.status === 'success' ? (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Dimensions:</strong> {result.width} × {result.height}
                      <br />
                      <strong>Aspect Ratio:</strong> {result.aspectRatio.toFixed(2)}
                      <br />
                      <strong>Format:</strong> {result.fileExtension.toUpperCase()}
                    </div>
                    <div>
                      <strong>Memory Est:</strong> {result.validation.memoryEstimate}
                      <br />
                      <strong>Power of 2:</strong> {result.validation.isPowerOfTwoBoth ? 'Yes' : 'No'}
                      <br />
                      <strong>Status:</strong> 
                      <span className={`ml-1 ${
                        result.validation.recommendation.startsWith('OPTIMAL') ? 'text-green-600' :
                        result.validation.recommendation.startsWith('WARNING') ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {result.validation.recommendation.split(':')[0]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-red-600">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Format Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Format Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formatRecommendations).map(([format, info]) => (
            <div key={format} className="p-4 border rounded">
              <h4 className="font-medium text-lg mb-2">
                {format.toUpperCase()}
                <span className={`ml-2 px-2 py-1 text-xs rounded ${
                  info.recommendation.includes('RECOMMENDED') ? 'bg-green-100 text-green-800' :
                  info.recommendation.includes('GOOD') ? 'bg-blue-100 text-blue-800' :
                  info.recommendation.includes('SAFE') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {info.recommendation.split(' ')[0]}
                </span>
              </h4>
              
              <div className="text-sm space-y-2">
                <div>
                  <strong>Best for:</strong> {info.bestFor}
                </div>
                
                <div>
                  <strong>Pros:</strong>
                  <ul className="list-disc list-inside text-green-600 ml-2">
                    {info.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <strong>Cons:</strong>
                  <ul className="list-disc list-inside text-red-600 ml-2">
                    {info.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold mb-2">How to Use This Tester</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Add your images to the <code>public/img/</code> folder</li>
          <li>Use the input field above to test specific images</li>
          <li>Check the results for format compatibility and performance recommendations</li>
          <li>Update your App.jsx with the image path that works best</li>
        </ol>
      </div>
    </div>
  );
};

export default ImageFormatTester;