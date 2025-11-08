import { useState, useEffect, useRef, useMemo } from "react";
import { Message, getItemsByBucket, addItem } from "../lib/storage";
import { useBucket } from "../hooks/useBucket";
import { useReadOnly } from "../hooks/useReadOnly";

export function Messages() {
  const [bucketId] = useBucket();
  const isReadOnly = useReadOnly();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [unlockAt, setUnlockAt] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const chunksRef = useRef<Blob[]>([]);
  const defaultLoveNote = useMemo<Message>(
    () => ({
      id: "default-love-note",
      bucketId: bucketId ?? "default",
      text: "No flowers would be as pretty as the flower that is reading this, I love you Zalia.",
      voiceUrl: null,
      unlockAt: null,
      createdAt: new Date("2025-10-21T00:00:00").toISOString(),
    }),
    [bucketId]
  );

  useEffect(() => {
    if (bucketId) {
      setMessages(getItemsByBucket<Message>("messages", bucketId));
    }
  }, [bucketId]);

  const handleAddMessage = (voiceUrl: string | null = null) => {
    if (bucketId && (newMessageText || voiceUrl)) {
      const newMessage = addItem<Message>(
        "messages",
        {
          text: newMessageText,
          voiceUrl: voiceUrl,
          unlockAt: unlockAt,
        },
        bucketId
      );
      setMessages([...messages, newMessage]);
      setNewMessageText("");
      setUnlockAt(null);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      handleAddMessage(url);
      chunksRef.current = [];
    };
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const isMessageVisible = (message: Message) => {
    if (!message.unlockAt) {
      return true;
    }
    return new Date(message.unlockAt).getTime() <= new Date().getTime();
  };

  const displayMessages = messages.length ? messages : [defaultLoveNote];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      {!isReadOnly && (
        <div className="mb-4">
          <input
            type="text"
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="New message..."
            className="bg-secondary text-text px-4 py-2 rounded-lg mr-2"
          />
          <input
            type="datetime-local"
            onChange={(e) => setUnlockAt(e.target.value)}
            className="bg-secondary text-text px-4 py-2 rounded-lg mr-2"
          />
          <button
            onClick={() => handleAddMessage()}
            className="bg-primary hover:bg-secondary text-text font-bold py-2 px-4 rounded-lg mr-2"
          >
            Add Message
          </button>
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`font-bold py-2 px-4 rounded-lg ${
              recording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
      )}
      <ul>
        {displayMessages.map((message) => (
          <li key={message.id} className="bg-secondary p-4 rounded-lg mb-2">
            {isMessageVisible(message) ? (
              <>
                <p>{message.text}</p>
                {message.voiceUrl && (
                  <audio src={message.voiceUrl} controls className="mt-2" />
                )}
              </>
            ) : (
              <p>
                This message will be unlocked on{" "}
                {new Date(message.unlockAt!).toLocaleString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
