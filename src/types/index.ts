export interface PullRequestPayload {
  action: string;
  pull_request: {
    title: string;
    user: {
      login: string;
    };
    html_url: string;
  };
  repository: {
    full_name: string;
  };
}

export interface AllowedMentions {
  parse?: Array<'roles' | 'users' | 'everyone'>;
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}
