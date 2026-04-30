import SplitLayout from '../components/Layout/SplitLayout';
import EditorPanel from '../components/Editor/EditorPanel';
import PreviewPanel from '../components/Preview/PreviewPanel';
import PublishModal from '../components/PublishModal';
import { usePortfolio } from '../hooks/usePortfolio';

export default function Builder() {
  const { isPublishModalOpen, setIsPublishModalOpen, lastPublishedSlug } = usePortfolio();

  return (
    <>
      <SplitLayout 
        editor={<EditorPanel />}
        preview={<PreviewPanel />}
      />
      <PublishModal 
        isOpen={isPublishModalOpen} 
        onClose={() => setIsPublishModalOpen(false)} 
        slug={lastPublishedSlug} 
      />
    </>
  );
}
