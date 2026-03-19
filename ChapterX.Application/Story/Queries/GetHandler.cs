using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Story.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IStoryRepository _storyRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IStoryRepository storyRepository, ILogger<GetHandler> logger)
        {
            _storyRepository = storyRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var story = await _storyRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(story);
        }
    }
}
