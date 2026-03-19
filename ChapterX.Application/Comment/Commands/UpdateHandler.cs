using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Comment.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(ICommentRepository commentRepository, ILogger<UpdateHandler> logger)
        {
            _commentRepository = commentRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var comment = await _commentRepository.GetByIdAsync(request.Id, cancellationToken);
            if (comment is null)
                return new UpdateResponse(false);

            comment.Content = request.Content;
            comment.UpdatedAt = DateTime.UtcNow;

            await _commentRepository.UpdateAsync(comment, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
