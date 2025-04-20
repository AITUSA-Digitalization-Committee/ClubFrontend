import { cn } from "@/utils/utils";

interface LoadingProps {
    className?: string,
}

function Loading({ className }: LoadingProps) {
    return (
        <div className={cn(className, 'w-full flex justify-center items-center')}>
            <div className={'w-8 h-8 border-4 border-primary rounded-full border-t-transparent animate-spin'} />
        </div>
    );
}

export default Loading;