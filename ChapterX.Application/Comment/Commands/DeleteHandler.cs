using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Comment.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(ICommentRepository commentRepository, ILogger<DeleteHandler> logger)
        {
            _commentRepository = commentRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var comment = await _commentRepository.GetByIdAsync(request.Id, cancellationToken);
            if (comment is null)
                return new DeleteResponse(false);

            await _commentRepository.DeleteAsync(comment, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
