using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Chapter.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IChapterRepository chapterRepository, ILogger<GetHandler> logger)
        {
            _chapterRepository = chapterRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var chapter = await _chapterRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(chapter);
        }
    }
}
