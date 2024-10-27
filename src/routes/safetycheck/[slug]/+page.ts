import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return { domain: params.slug };

    error(404, 'Not found');
};
