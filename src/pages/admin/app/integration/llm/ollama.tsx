export default function OllamaProvider() {
    return (
        <div className='flex items-center space-x-3 py-3 px-4 h-18 hover:shadow-lg cursor-pointer' onClick={() => window.open('https://ollama.com', '_blank')}>
            <img className='size-8 rounded-lg' alt='authing' src="https://ollama.com/public/ollama.png" />
            <div className='flex flex-col'>
                <span>Ollama</span>
            </div>
        </div>
    );
}