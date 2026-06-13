"use client";

import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";

type Post = {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  likes: number;
  createdAt: number;
};

export default function CommunityPage() {
  const { currentUser } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hph_community_db");
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      // Mock seed data
      const seed: Post[] = [
        {
          id: "post-1",
          authorId: "admin-1",
          authorName: "Admin User",
          authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          content: "Welcome to JSVerse Hub! We're excited to have you here. Drop a comment below if you need any help getting started.",
          likes: 42,
          createdAt: Date.now() - 86400000, // 1 day ago
        }
      ];
      setPosts(seed);
      localStorage.setItem("hph_community_db", JSON.stringify(seed));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hph_community_db", JSON.stringify(posts));
    }
  }, [posts, isLoaded]);

  const handlePost = () => {
    if (!currentUser || !newPostContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorPhoto: currentUser.photoUrl,
      content: newPostContent.trim(),
      likes: 0,
      createdAt: Date.now(),
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold flex items-center gap-4 mb-4">
          <MessageSquare className="w-10 h-10 text-blue-500" />
          Community Discussion
        </h1>
        <p className="text-xl text-zinc-400">Ask questions, share your projects, and connect with other learners.</p>
      </div>

      {currentUser ? (
        <div className="glass-card rounded-3xl p-6 border border-white/10 mb-12 flex gap-4">
          <img src={currentUser.photoUrl} alt="You" className="w-12 h-12 rounded-full bg-zinc-800 shrink-0" />
          <div className="flex-1">
            <textarea 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 resize-none h-24 mb-4"
            />
            <div className="flex justify-end">
              <button 
                onClick={handlePost}
                disabled={!newPostContent.trim()}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Post
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 border border-white/10 mb-12 text-center text-zinc-500">
          <p>You must be logged in to post in the community.</p>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post, idx) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={post.authorPhoto} alt={post.authorName} className="w-10 h-10 rounded-full bg-zinc-800" />
              <div>
                <h3 className="font-bold">{post.authorName}</h3>
                <p className="text-xs text-zinc-500">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <p className="text-zinc-300 mb-6 whitespace-pre-wrap">{post.content}</p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors text-sm font-bold"
              >
                <ThumbsUp className="w-4 h-4" /> {post.likes}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
