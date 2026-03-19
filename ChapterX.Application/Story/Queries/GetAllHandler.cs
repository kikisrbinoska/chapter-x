using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Story.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IStoryRepository _storyRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IStoryRepository storyRepository, ILogger<GetAllHandler> logger)
        {
            _storyRepository = storyRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var stories = await _storyRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(stories);
        }
    }
}
