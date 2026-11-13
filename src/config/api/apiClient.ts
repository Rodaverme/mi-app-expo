export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    const baseUrl = this.baseUrl.trim().replace(/\/+$/, '');
    if (!baseUrl) {
      throw new Error('Configura la URL base de la API antes de realizar una petición.');
    }

    const response = await fetch(`${baseUrl}/${path.replace(/^\/+/, '')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new ApiError(
        details || `La solicitud falló con el estado ${response.status}.`,
        response.status
      );
    }

    return (await response.json()) as TResponse;
  }
}
