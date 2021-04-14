import type {
    ExtendedStory, NewsroomCompanyInformation,
} from '@prezly/sdk/dist/types';
import { GetServerSideProps, NextPage } from 'next';
import { getPrezlyApi } from '@/utils/prezly';
import Story from '@/modules/Story';
import Layout from '@/components/Layout';
import { NewsroomContextProvider } from '@/contexts/newsroom';
import { BasePageProps } from 'types';

interface Props extends BasePageProps {
    story: ExtendedStory;
    companyInformation: NewsroomCompanyInformation;
}

const StoryPage: NextPage<Props> = ({
    story, categories, newsroom, companyInformation,
}) => (
    <NewsroomContextProvider
        categories={categories}
        newsroom={newsroom}
        companyInformation={companyInformation}
    >
        <Layout>
            <Story story={story} companyInformation={companyInformation} />
        </Layout>
    </NewsroomContextProvider>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const api = getPrezlyApi(context.req);
    const { slug } = context.params as { slug?: string };
    const story = slug ? await api.getStoryBySlug(slug) : null;

    if (!story) {
        return { notFound: true };
    }

    const categories = await api.getCategories();
    const newsroom = await api.getNewsroom();
    const companyInformation = await api.getCompanyInformation();

    return {
        props: {
            story,
            categories,
            newsroom,
            companyInformation,
        },
    };
};

export default StoryPage;
