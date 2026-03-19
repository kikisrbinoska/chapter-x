using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Likes.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly ILikesRepository _likesRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(ILikesRepository likesRepository, ILogger<UpdateHandler> logger)
        {
            _likesRepository = likesRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var like = await _likesRepository.GetByIdAsync(request.Id, cancellationToken);
            if (like is null)
                return new UpdateResponse(false);

            like.UserId = request.UserId;
            like.StoryId = request.ChapterId;

            await _likesRepository.UpdateAsync(like, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
