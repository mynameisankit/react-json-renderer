import type { Dispatch, SetStateAction } from 'react';

type SetLines = Dispatch<SetStateAction<readonly Line[]>>;

export { SetLines as default };
