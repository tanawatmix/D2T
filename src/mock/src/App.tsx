import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./themeContext"; 

import HomeUI from "./../src/views/Home_ui";
import LoginUI from "./../src/views/Login_ui";
import RegisterUI from "./../src/views/Register_ui";
import PostUI from "./views/Post_Pages";
import PostDetailsUI from "./../src/views/PostDetails_ui";
import ChatUI from "./../src/views/Chat_ui";
import ProfileUI from "./../src/views/profile_ui";
import CreatePostUI from "./views/CreatePost_ui";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeUI />} />
          <Route path="/login" element={<LoginUI />} />
          <Route path="/register" element={<RegisterUI />} />
          <Route path="/Posts" element={<PostUI />} />
          <Route path="/post/:postId" element={<PostDetailsUI />} />
          <Route path="/chat/:postId" element={<ChatUI />} />
          <Route path="/profile" element={<ProfileUI />} />
          <Route path="/create-post" element={<CreatePostUI />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
