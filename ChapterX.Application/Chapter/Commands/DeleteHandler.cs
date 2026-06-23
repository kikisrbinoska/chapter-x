using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Chapter.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IChapterRepository chapterRepository, ILogger<DeleteHandler> logger)
        {
            _chapterRepository = chapterRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var chapter = await _chapterRepository.GetByIdWithStoryAsync(request.Id, cancellationToken);
            if (chapter is null)
                return new DeleteResponse(false);

            if (chapter.Story.UserId != request.CallerId)
                throw new UnauthorizedAccessException("You do not own this chapter.");

            await _chapterRepository.DeleteAsync(chapter, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
