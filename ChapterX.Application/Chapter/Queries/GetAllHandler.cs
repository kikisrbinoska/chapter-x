using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Chapter.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IChapterRepository chapterRepository, ILogger<GetAllHandler> logger)
        {
            _chapterRepository = chapterRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var chapters = await _chapterRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(chapters);
        }
    }
}
