using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.HasGenre.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IHasGenreRepository _hasGenreRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IHasGenreRepository hasGenreRepository, ILogger<GetAllHandler> logger)
        {
            _hasGenreRepository = hasGenreRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var hasGenres = await _hasGenreRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(hasGenres);
        }
    }
}
