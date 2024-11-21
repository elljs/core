export default function OpenAIProvider() {
    return (
        <div className='flex items-center space-x-3 py-3 px-4 h-18 hover:shadow-lg cursor-pointer' onClick={() => window.open('https://openai.com', '_blank')}>
            <img className='size-8 rounded-lg' alt='authing' src="https://avatars.githubusercontent.com/u/14957082?s=48&v=4" />
            <div className='flex flex-col'>
                <span>OpenAI</span>
            </div>
        </div>
    );
}