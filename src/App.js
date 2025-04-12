import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './App.css';
import slideData from './data/slideData';

// Home/landing page component
const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically navigate to the first slide
    navigate('/slide/1');
  }, [navigate]);
  
  return (
    <div className="home-container">
      <h1>🔍 Kutumbua</h1>
      <p>Presentation loading...</p>
    </div>
  );
};

// Mermaid diagram component
const MermaidDiagram = ({ content }) => {
  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.contentLoaded();
    }
  }, [content]);

  return <div className="mermaid">{content}</div>;
};

// Slide component with proper markdown rendering
const Slide = ({ content }) => {
  return (
    <div className="slide-content">
      <ReactMarkdown 
        children={content} 
        rehypePlugins={[rehypeRaw]} 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom handling for code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            
            // Special handling for mermaid diagrams
            if (!inline && match && match[1] === 'mermaid') {
              return <MermaidDiagram content={String(children).replace(/\n$/, '')} />;
            }
            
            // Default handling for other code blocks
            return !inline ? (
              <pre className={className} {...props}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
};

// Slide viewer component with navigation
const SlideViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const slideId = parseInt(id);
  
  // Get current slide data
  const slide = slideData.find(s => s.id === slideId) || slideData[0];
  
  // Navigation handlers
  const goToNextSlide = () => {
    if (slideId < slideData.length) {
      navigate(`/slide/${slideId + 1}`);
    }
  };
  
  const goToPrevSlide = () => {
    if (slideId > 1) {
      navigate(`/slide/${slideId - 1}`);
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideId]);
  
  return (
    <div className="slide-viewer">
      <div className="slide-container">
        <Slide content={slide.content} />
      </div>
      
      <div className="navigation-controls">
        <button 
          onClick={goToPrevSlide} 
          disabled={slideId === 1}
          className="nav-button prev"
        >
          Previous
        </button>
        
        <div className="slide-progress">
          {slideId} / {slideData.length}
        </div>
        
        <button 
          onClick={goToNextSlide} 
          disabled={slideId === slideData.length}
          className="nav-button next"
        >
          Next
        </button>
      </div>
      
      <div className="slide-menu">
        <button className="menu-toggle" onClick={() => document.body.classList.toggle('menu-open')}>
          ☰ Slides
        </button>
        <div className="slide-list">
          {slideData.map(s => (
            <Link 
              key={s.id} 
              to={`/slide/${s.id}`} 
              className={slideId === s.id ? 'active' : ''}
              onClick={() => document.body.classList.remove('menu-open')}
            >
              {s.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/slide/:id" element={<SlideViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
