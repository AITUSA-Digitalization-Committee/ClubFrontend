import { cn } from "@/utils/utils";
import { ReactNode } from "react";
import Container from "./Container";

interface ViewProps {
    className?: string,
    children?: ReactNode,
    container?: boolean
}

function View({ className, container, children }: ViewProps) {
    return (
        <>
            {container
                ? (
                    <Container className={cn('h-dvh', className)}>
                        {children}
                    </Container>
                )
                : (
                    <div className={cn('h-dvh', className)}>
                        {children}
                    </div>
                )
            }
        </>
    );
}

export default View;