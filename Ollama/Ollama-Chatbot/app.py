from flask import Flask, render_template, request, jsonify
from typing import Optional
import requests

app = Flask(__name__)
app.static_folder = 'static'

class OllamaClient:
    def __init__(self, base_url: str = "http://localhost:11434"):
        self.base_url = base_url

    def generate(self, model: str, prompt: str, system: str = None) -> Optional[str]:
        try:
            payload = {
                "model": model,
                "prompt": prompt,
                "stream": False,
                # Add performance optimizations
                "num_ctx": 2048,        # Reduced context window
                "num_thread": 4,        # Adjust based on your CPU cores
                "temperature": 0.7,     # Lower for faster, more focused responses
                "top_p": 0.9,          # Nucleus sampling threshold
                "repeat_penalty": 1.1   # Prevent repetitive responses
            }
            if system:
                payload["system"] = system
            
            response = requests.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=30  # Add timeout to prevent hanging
            )
            response.raise_for_status()
            return response.json().get("response", "")
        except requests.Timeout:
            return "Request timed out. Please try again."
        except Exception as e:
            return str(e)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    client = OllamaClient()
    response = client.generate(
        model=data.get('model', 'mistral:7b-instruct-q4_K_M'),  # Use quantized model
        prompt=data.get('prompt', ''),
        system=data.get('system', '')
    )
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
