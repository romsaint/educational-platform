import Sidebar from './components/sidebar';
import { MainContent } from './components/main';
import { useParams } from 'react-router-dom';

export function Task() {
  const id = useParams().id;
  return (
    <div className="relative flex size-full min-h-screen bg-[#fcf9f8] group/design-root overflow-x-hidden" style={{fontFamily: '"Space Grotesk", "Noto Sans", sans-serif'}}>
      <Sidebar />
      <MainContent />
    </div>
  );
}