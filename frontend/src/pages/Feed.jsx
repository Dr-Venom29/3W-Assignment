import { useEffect, useState } from 'react';
import { Box, Container, Fab, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import FeedTabs from '../components/FeedTabs';
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNav';
import AddIcon from '@mui/icons-material/Add';
import { getPosts } from '../services/api';

export default function Feed({ onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Post');
  const [showPromotionsOnly, setShowPromotionsOnly] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const isPromotionPost = (post) => {
    const text = post?.text || '';
    return (
      text.startsWith('Promotion:') || text.startsWith('📢 Promotion:')
    );
  };

  const getVisiblePosts = () => {
    const base = showPromotionsOnly
      ? posts.filter(isPromotionPost)
      : posts;

    const ordered = [...base];

    if (activeTab === 'Most Liked') {
      ordered.sort(
        (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
      );
    } else if (activeTab === 'Most Commented') {
      ordered.sort(
        (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
      );
    }

    return ordered;
  };

  const visiblePosts = getVisiblePosts();

  return (
    <Box sx={{ background: '#f5f6fb', minHeight: '100vh', py: { xs: 2, sm: 3 }, pb: { xs: 18, sm: 20 } }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 0 } }}>
        <Navbar onLogout={onLogout} />
        <CreatePost
          onPostCreated={fetchPosts}
          onModeChange={(m) => setShowPromotionsOnly(m === 'promotion')}
        />
        <FeedTabs active={activeTab} onChange={setActiveTab} />

        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          {loading ? (
            <Typography textAlign="center" mt={4} color="text.secondary">
              Loading posts...
            </Typography>
          ) : visiblePosts.length > 0 ? (
            visiblePosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                refreshPosts={fetchPosts}
              />
            ))
          ) : (
            <Box textAlign="center" mt={5}>
              <Typography variant="h6">No posts yet</Typography>
              <Typography color="text.secondary">
                Be the first to post something 
              </Typography>
            </Box>
          )}
        </Box>
      </Container>

      <BottomNavBar />

      <Fab
        color="primary"
        size="medium"
        sx={{
          position: 'fixed',
          bottom: 88,
          right: { xs: 16, sm: 24 },
          boxShadow: '0 10px 24px rgba(13,139,255,0.35)',
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
