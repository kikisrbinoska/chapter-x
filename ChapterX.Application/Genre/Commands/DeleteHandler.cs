using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Genre.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IGenreRepository _genreRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IGenreRepository genreRepository, ILogger<DeleteHandler> logger)
        {
            _genreRepository = genreRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var genre = await _genreRepository.GetByIdAsync(request.Id, cancellationToken);
            if (genre is null)
                return new DeleteResponse(false);

            await _genreRepository.DeleteAsync(genre, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
