import type { FunctionComponent } from 'react';

import StoryItem from './StoryItem';
import { StoryWithContent } from './lib/types';

type Props = {
    stories: StoryWithContent[];
};

const StoriesList: FunctionComponent<Props> = ({ stories }) => (
    <>
        {!stories.length && (
            <p className="text-2xl text-center py-10">No stories here yet.</p>
        )}
        {stories.map((story) => (
            <StoryItem key={story.uuid} story={story} />
        ))}
    </>
);

export default StoriesList;
