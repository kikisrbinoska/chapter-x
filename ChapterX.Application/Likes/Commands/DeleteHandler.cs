using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Likes.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly ILikesRepository _likesRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(ILikesRepository likesRepository, ILogger<DeleteHandler> logger)
        {
            _likesRepository = likesRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var like = await _likesRepository.GetByIdAsync(request.Id, cancellationToken);
            if (like is null)
                return new DeleteResponse(false);

            await _likesRepository.DeleteAsync(like, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
