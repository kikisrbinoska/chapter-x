using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Comment.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(ICommentRepository commentRepository, ILogger<GetHandler> logger)
        {
            _commentRepository = commentRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var comment = await _commentRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(comment);
        }
    }
}
