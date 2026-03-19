using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Likes.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly ILikesRepository _likesRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(ILikesRepository likesRepository, ILogger<GetHandler> logger)
        {
            _likesRepository = likesRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var like = await _likesRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(like);
        }
    }
}
