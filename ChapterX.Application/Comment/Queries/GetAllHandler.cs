using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Comment.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(ICommentRepository commentRepository, ILogger<GetAllHandler> logger)
        {
            _commentRepository = commentRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var comments = await _commentRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(comments);
        }
    }
}
