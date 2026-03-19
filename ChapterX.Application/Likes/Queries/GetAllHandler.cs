using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Likes.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly ILikesRepository _likesRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(ILikesRepository likesRepository, ILogger<GetAllHandler> logger)
        {
            _likesRepository = likesRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var likes = await _likesRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(likes);
        }
    }
}
