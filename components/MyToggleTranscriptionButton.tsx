// import Image from 'next/image';
import { Bold } from "lucide-react"
 
import { Toggle } from "@/components/ui/toggle"

const MyToggleTranscriptionButton = () => {
  return (
    // <div>
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
    // {/* </div> */}
  );
};

export default MyToggleTranscriptionButton;