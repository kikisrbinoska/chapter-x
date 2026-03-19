using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Comment.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(ICommentRepository commentRepository, ILogger<AddHandler> logger)
        {
            _commentRepository = commentRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var comment = new Domain.Entities.Comment
            {
                Content = request.Content,
                UserId = request.UserId,
                StoryId = request.StoryId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _commentRepository.AddAsync(comment, cancellationToken);

            return new AddResponse(comment.Id);
        }
    }
}
