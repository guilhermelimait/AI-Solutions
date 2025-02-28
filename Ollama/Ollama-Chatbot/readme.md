# Chat with Ollama

A simple web interface to interact with Ollama's language models, built with Flask and modern web technologies.

## Overview

This project provides a clean, user-friendly interface to interact with Ollama's language models. It features:
- 🌓 Dark/Light mode
- 💬 Chat-like interface
- ⚡ Real-time responses
- 🎨 Modern design

## Prerequisites

- Python 3.8 or higher
- Ollama installed on your system ([Ollama Installation Guide](https://github.com/ollama/ollama))
- At least 8GB RAM (16GB recommended)
- NVIDIA GPU (optional, for better performance)

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd LLM
```

2. Install Python dependencies:
```bash
pip install flask requests
```

3. Install Ollama from [ollama.ai](https://ollama.ai) or using the command line:
```bash
curl https://ollama.ai/install.sh | sh
```

## Setting up Ollama

1. Start the Ollama server:
```bash
ollama serve
```

2. Pull the Mistral model (in a new terminal):
```bash
ollama pull mistral
```

For better performance, you can pull the quantized version:
```bash
ollama pull mistral:7b-instruct-q4_K_M
```

## Running the Application

1. Start the Flask application:
```bash
python app.py
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
LLM/
├── static/
│   ├── styles.css    # Styling
│   └── main.js       # Frontend logic
├── templates/
│   └── index.html    # Main page
└── app.py           # Flask backend
```

## Model Information

Currently using:
- **Mistral 7B**: A powerful and efficient language model
  - Default model: `mistral:7b-instruct-q4_K_M`
  - Context window: 2048 tokens
  - Optimized for faster responses

## Performance Optimization

The application includes several optimizations:
- Reduced context window size (2048 tokens)
- Adjusted thread count (4 threads)
- Temperature setting of 0.7
- Response timeout of 30 seconds

For better performance:
- Use a GPU if available
- Use quantized models
- Adjust `num_thread` based on your CPU cores

## Troubleshooting

1. If Ollama is slow to respond:
   - Check if the model is properly loaded
   - Use quantized versions of models
   - Ensure adequate system resources

2. If the web interface isn't loading:
   - Verify Flask is running on port 5000
   - Check browser console for errors
   - Clear browser cache

3. Common errors:
   - "Connection refused": Ensure Ollama server is running
   - "Model not found": Pull the model first using `ollama pull`

## Resources

- [Ollama GitHub Repository](https://github.com/ollama/ollama)
- [Ollama Model Library](https://ollama.ai/library)
- [Mistral AI](https://mistral.ai/)
- [Flask Documentation](https://flask.palletsprojects.com/)

## Contributing

Feel free to open issues or submit pull requests to improve the application.

## License

MIT License