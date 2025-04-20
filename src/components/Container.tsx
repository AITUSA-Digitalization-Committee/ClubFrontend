import { cn } from "@/utils/utils";
import { ReactNode } from "react";

interface ContainerProps {
    className?: string,
    children?: ReactNode
}

function Container({ className, children }: ContainerProps) {
    return (
        <div className={cn("px-5 py-6 flex flex-col", className)}>
            {children}
        </div>
    );
}

export default Container;