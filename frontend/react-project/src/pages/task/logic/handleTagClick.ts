export function handleTagClick(tag: string | null, searchParams: URLSearchParams) {
    const newSearch = new URLSearchParams(searchParams);
    if (tag) {
      newSearch.set("tags", tag.trim());
      window.history.pushState({}, "", `/tasks?${newSearch.toString()}`);
      location.reload();
    }
  }