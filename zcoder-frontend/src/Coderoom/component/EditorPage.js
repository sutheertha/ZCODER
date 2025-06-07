import { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useHistory,
  useLocation,
  Redirect,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import './Editor.css'

// List of supported languages
const LANGUAGES = [
  "python3",
  "java",
  "cpp",
  "nodejs",
  "c",
  "ruby",
  "go",
  "scala",
  "bash",
  "sql",
  "pascal",
  "csharp",
  "php",
  "swift",
  "rust",
  "r",
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const codeRef = useRef(null);
  const socketListenersRef = useRef({});

  const location = useLocation();
  const history = useHistory();
  const { roomId } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const currentListeners = socketListenersRef.current;

    const handleErrors = (err) => {
      console.log("Error", err);
      toast.error("Socket connection failed, Try again later");
      history.push("/chatroom");
    };

    const init = async () => {
      try {
        const socket = await initSocket();
        if (!isMounted) return;

        socketRef.current = socket;
        socket.on("connect_error", handleErrors);
        socket.on("connect_failed", handleErrors);

        socket.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state.state?.username,
        });

        currentListeners[ACTIONS.JOINED] = ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socket.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        };

        currentListeners[ACTIONS.DISCONNECTED] = ({ socketId, username }) => {
          toast.success(`${username} left the room`);
          setClients((prev) => prev.filter((client) => client.socketId !== socketId));
        };

        socket.on(ACTIONS.JOINED, currentListeners[ACTIONS.JOINED]);
        socket.on(ACTIONS.DISCONNECTED, currentListeners[ACTIONS.DISCONNECTED]);
      } catch (err) {
        handleErrors(err);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        Object.entries(currentListeners).forEach(([event, handler]) => {
          socketRef.current.off(event, handler);
        });

        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [roomId, location.state?.username, history]);


  if (!location.state) {
    return <Redirect to="/chatroom" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    history.push("/chatroom");
  };

  const runCode = async () => {
    setIsCompiling(true);
    try {
      const response = await axios.post("http://localhost:5000/compile", {
        code: codeRef.current,
        language: selectedLanguage,
      });
      console.log("Backend response:", response.data);
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (error) {
      console.error("Error compiling code:", error);
      setOutput(error.response?.data?.error || "An error occurred");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };
  console.log(clients)
  return (
    <div className="codecast-app-container">
      <div className="codecast-editor-layout">
        {/* Client panel */}
        <div className="codecast-sidebar">
          <img
            src="/images/codecast.png"
            alt="Logo"
            className="codecast-sidebar-logo"
            style={{ maxWidth: "150px", marginTop: "10 px" }}
          />
          <hr codecast-divider />

          {/* Client list container */}
          <div className="codecast-client-list">
            <span className="codecast-client-title">Members</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <hr className="codecast-divider"/>
          {/* Buttons */}
          <div className="codecast-sidebar-actions">
            <button className="codecast-btn codecast-btn-success" onClick={copyRoomId}>
              Copy Room ID
            </button>
            <button className="codecast-btn codecast-btn-danger" onClick={leaveRoom}>
              Leave Room
            </button>
          </div>
        </div>

        {/* Editor panel */}
        <div className="codecast-editor-panel">
          {/* Language selector */}
          <div className="codecast-language-selector">
            <select
              className="codecast-language-dropdown"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>

      {/* Compiler toggle button */}
      <button
        className="codecast-btn codecast-btn-primary codecast-compiler-toggle"
        onClick={toggleCompileWindow}
        style={{ zIndex: 1050 }}
      >
        {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
      </button>

      {/* Compiler section */}
      <div
        className={`bg-dark text-light p-3 ${
          isCompileWindowOpen ? "d-block" : "d-none"
        }`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: isCompileWindowOpen ? "30vh" : "0",
          transition: "height 0.3s ease-in-out",
          overflowY: "auto",
          zIndex: 1040,
        }}
      >
        <div className="codecast-compiler-header">
          <h5 className="m-0">Compiler Output ({selectedLanguage})</h5>
          <div>
            <button
              className="codecast-btn codecast-btn-success"
              onClick={runCode}
              disabled={isCompiling}
            >
              {isCompiling ? "Compiling..." : "Run Code"}
            </button>
          </div>
        </div>
        <pre className="codecast-compiler-result">
          {output || "Output will appear here after compilation"}
        </pre>
      </div>
    </div>
  );
}

export default EditorPage;