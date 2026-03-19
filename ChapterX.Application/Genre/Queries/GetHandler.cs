using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Genre.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IGenreRepository _genreRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IGenreRepository genreRepository, ILogger<GetHandler> logger)
        {
            _genreRepository = genreRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var genre = await _genreRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(genre);
        }
    }
}
