using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Genre.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IGenreRepository _genreRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IGenreRepository genreRepository, ILogger<GetAllHandler> logger)
        {
            _genreRepository = genreRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var genres = await _genreRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(genres);
        }
    }
}
