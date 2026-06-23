using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Chapter.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IChapterRepository chapterRepository, ILogger<UpdateHandler> logger)
        {
            _chapterRepository = chapterRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var chapter = await _chapterRepository.GetByIdWithStoryAsync(request.Id, cancellationToken);
            if (chapter is null)
                return new UpdateResponse(false);

            if (chapter.Story.UserId != request.CallerId)
                throw new UnauthorizedAccessException("You do not own this chapter.");

            chapter.Number = request.Number;
            chapter.Name = request.Name;
            chapter.Title = request.Title;
            chapter.Content = request.Content;
            chapter.WordCount = request.WordCount;
            chapter.UpdatedAt = DateTime.UtcNow;

            await _chapterRepository.UpdateAsync(chapter, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
