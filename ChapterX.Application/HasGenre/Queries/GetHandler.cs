using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.HasGenre.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IHasGenreRepository _hasGenreRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IHasGenreRepository hasGenreRepository, ILogger<GetHandler> logger)
        {
            _hasGenreRepository = hasGenreRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var hasGenre = await _hasGenreRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(hasGenre);
        }
    }
}
