import ChatBotContainer from "./chatbot/ChatBotContainer"
import TalksContainer from "./talks/TalksContainer"
import { useState } from "react"

export default function EcoAdviceComponent() {
    const [selectedComponent, setSelectedComponent] = useState<'talks' | 'chat' | null>(null);
    
    return (
        <>
            {!selectedComponent && (
                <div className="space-y-4">
                    <button 
                        onClick={() => setSelectedComponent('chat')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Have A Question
                    </button>
                    <button 
                        onClick={() => setSelectedComponent('talks')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        View Talks
                    </button>
                </div>
            )}
            {selectedComponent === 'talks' && <TalksContainer />}
            {selectedComponent === 'chat' && <ChatBotContainer />}
        </>
    )
}