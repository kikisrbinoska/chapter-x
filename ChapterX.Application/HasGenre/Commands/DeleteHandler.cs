using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.HasGenre.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IHasGenreRepository _hasGenreRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IHasGenreRepository hasGenreRepository, ILogger<DeleteHandler> logger)
        {
            _hasGenreRepository = hasGenreRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var hasGenre = await _hasGenreRepository.GetByIdAsync(request.Id, cancellationToken);
            if (hasGenre is null)
                return new DeleteResponse(false);

            await _hasGenreRepository.DeleteAsync(hasGenre, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
