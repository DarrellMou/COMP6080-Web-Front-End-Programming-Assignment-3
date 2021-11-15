import { callFetch } from './Fetch';

export function unpublish (id, setAvailabilities) {
  callFetch('PUT', `/listings/unpublish/${id}`, undefined, false, true)
    .then(() => setAvailabilities([]));
}
