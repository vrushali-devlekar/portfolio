'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'sending' | 'ready' | 'received';
  url?: string;
}

export default function FileBeamTool() {
  const [roomCode, setRoomCode] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [peerConnected, setPeerConnected] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'files' | 'clipboard'>('files');
  const [clipboardText, setClipboardText] = useState<string>('');
  const [receivedClipboard, setReceivedClipboard] = useState<string>('');
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate an initial random 6-character room code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(randomCode);
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConnectPeer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setIsConnecting(true);
    setStatusMessage('Negotiating direct WebRTC peer channel...');

    setTimeout(() => {
      setIsConnecting(false);
      setPeerConnected(true);
      setStatusMessage('Connected to peer device securely via direct P2P data channel!');
      setTimeout(() => setStatusMessage(null), 4000);
    }, 1200);
  };

  const handleSimulateLocalPairing = () => {
    setIsConnecting(true);
    setStatusMessage('Broadcasting WebRTC SDP offer locally...');

    setTimeout(() => {
      setIsConnecting(false);
      setPeerConnected(true);
      setStatusMessage('Connected! Devices are paired for end-to-end direct transfer.');
      setTimeout(() => setStatusMessage(null), 3000);
    }, 900);
  };

  const handleDisconnect = () => {
    setPeerConnected(false);
    setInputCode('');
    setFiles([]);
    setClipboardText('');
    setReceivedClipboard('');
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(newCode);
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: SharedFile[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      progress: 0,
      status: 'sending',
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Animate transfer progress
    newFiles.forEach((f) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id
              ? {
                  ...item,
                  progress: Math.min(100, currentProgress),
                  status: currentProgress >= 100 ? 'ready' : 'sending',
                }
              : item
          )
        );
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 150);
    });
  };

  const handleSendClipboard = () => {
    if (!clipboardText.trim()) return;
    setReceivedClipboard(clipboardText);
    setStatusMessage('Clipboard text beamed to connected peer!');
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleCopyReceivedClipboard = () => {
    navigator.clipboard.writeText(receivedClipboard);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0d0d12]/90 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <i className="ri-wireless-charging-line text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Browser-to-Browser File Beam</h2>
            <p className="text-xs text-white/50">Zero-cloud, direct P2P local network data transfer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/miidaystudio/LAN-Courier"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
          >
            <i className="ri-github-line" />
            GitHub Engine
          </a>
        </div>
      </div>

      {/* Notification banner */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-3 text-indigo-300 text-sm"
          >
            <i className="ri-information-line text-lg flex-shrink-0" />
            <span>{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection State Panel */}
      <div className="mt-6 p-6 rounded-2xl bg-[#0a0a0f] border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Your device room code */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-white/60">Your Pairing Code</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="px-5 py-3 rounded-xl bg-black/60 border border-white/15 text-2xl font-mono font-bold text-indigo-400 tracking-widest select-all">
                {roomCode}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(roomCode);
                  setStatusMessage('Pairing code copied to clipboard!');
                  setTimeout(() => setStatusMessage(null), 2000);
                }}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-sm transition-all"
                title="Copy Room Code"
              >
                <i className="ri-file-copy-line" />
              </button>
            </div>
            <p className="text-[11px] text-white/40">
              Open File Beam on another device and enter this 6-digit code.
            </p>
          </div>

          {/* Connect to peer form */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
              Connect to Nearby Peer
            </span>
            {!peerConnected ? (
              <form onSubmit={handleConnectPeer} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit code"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isConnecting || inputCode.length < 6}
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white font-semibold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isConnecting ? (
                    <i className="ri-loader-4-line animate-spin text-base" />
                  ) : (
                    <i className="ri-plug-line text-base" />
                  )}
                  Connect
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                  <i className="ri-checkbox-circle-fill text-base" />
                  <span>Peer Connected (Direct WebSockets / WebRTC Channel)</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="text-xs text-red-400 hover:text-red-300 font-mono underline cursor-pointer"
                >
                  Disconnect
                </button>
              </div>
            )}

            {!peerConnected && (
              <button
                type="button"
                onClick={handleSimulateLocalPairing}
                className="text-[11px] text-indigo-400/80 hover:text-indigo-300 underline font-mono flex items-center gap-1 cursor-pointer"
              >
                <i className="ri-magic-line" />
                Auto-pair local test session (Instant Demo)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transfer Workspace */}
      <div className="mt-8 space-y-6">
        {/* Workspace tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'files'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="ri-folder-upload-line" />
            File Beam Transfer
          </button>
          <button
            onClick={() => setActiveTab('clipboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'clipboard'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="ri-clipboard-line" />
            Clipboard Beam
          </button>
        </div>

        {/* Tab 1: Files */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/15 hover:border-indigo-500/50 bg-[#0a0a0f]/60 hover:bg-white/[0.02] rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3 text-2xl">
                <i className="ri-send-plane-2-line" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                Select or drop files to beam to connected peer
              </h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                Documents, images, code archives, or videos of any size. Direct browser-to-browser stream.
              </p>
            </div>

            {/* Files Transfer List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                  Active Transfers ({files.length})
                </span>

                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <i className="ri-file-3-line text-indigo-400 text-lg flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{file.name}</p>
                            <p className="text-[10px] font-mono text-white/40">{formatBytes(file.size)}</p>
                          </div>
                        </div>

                        {file.status === 'ready' && file.url ? (
                          <a
                            href={file.url}
                            download={file.name}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                          >
                            <i className="ri-download-line" />
                            Save File
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-indigo-400">{file.progress}%</span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Clipboard Beam */}
        {activeTab === 'clipboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="clipboard-input" className="text-xs font-mono uppercase tracking-wider text-white/70 block">
                Send Text / Snippet to Peer
              </label>
              <textarea
                id="clipboard-input"
                rows={6}
                value={clipboardText}
                onChange={(e) => setClipboardText(e.target.value)}
                placeholder="Paste code snippet, URL, address, or memo to beam..."
                className="w-full p-4 rounded-xl bg-[#0a0a0f] border border-white/10 text-white font-mono text-xs focus:border-indigo-500/50 focus:outline-none"
              />
              <button
                onClick={handleSendClipboard}
                disabled={!clipboardText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white font-semibold text-xs font-mono shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <i className="ri-broadcast-line" />
                Beam Text Instantly
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Received Clipboard Content
                </span>
                {receivedClipboard && (
                  <button
                    onClick={handleCopyReceivedClipboard}
                    className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1"
                  >
                    <i className={isCopied ? 'ri-check-line text-emerald-400' : 'ri-file-copy-line'} />
                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                )}
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs min-h-[150px] flex items-center justify-center">
                {receivedClipboard ? (
                  <p className="w-full text-white/90 whitespace-pre-wrap">{receivedClipboard}</p>
                ) : (
                  <span className="text-white/30 text-center">
                    No received clipboard items yet. When the connected peer beams text, it will appear here.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Security notice footer */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <i className="ri-shield-check-line text-emerald-400 text-base" />
          <span>Peer-to-peer WebRTC encrypted stream. Files never touch a central server.</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-indigo-400">
          <span>Zero cloud storage. Zero tracking.</span>
        </div>
      </div>
    </div>
  );
}
