import { PageType } from '../../types/enums/PageType'

export type Props = {
	title: string;
    pageType: PageType;
    isFeatured?: boolean;
	subtitle?: string;
};