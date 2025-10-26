import {Button} from "@workspace/ui/components/button";
import {cn} from "@workspace/ui/lib/utils";


interface InfiniteScrollTriggerProps {
    canLoadMore: boolean;
    isLoadingMore: boolean;
    onLoadMore: () => void;
    loadMoreText?: string;
    noMoreText?: string;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
}


export const InfiniteScrollTrigger = ({canLoadMore, isLoadingMore, onLoadMore, loadMoreText = "Load more", noMoreText = "No more items", className, ref}: InfiniteScrollTriggerProps) => {
    let text = loadMoreText;

    if(isLoadingMore) {
        text = "Loading...";
    } else if(!canLoadMore) {
        text = noMoreText;
    }

    return (
        <div className={cn("w-full py-2 flex items-center justify-center", className)} ref={ref}>
           <Button variant="ghost" size="sm" disabled={isLoadingMore || !canLoadMore} onClick={onLoadMore}>{text}</Button>
        </div>
    )
}