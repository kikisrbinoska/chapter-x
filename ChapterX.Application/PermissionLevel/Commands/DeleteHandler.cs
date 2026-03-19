using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.PermissionLevel.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(ILogger<DeleteHandler> logger)
        {
            _logger = logger;
        }

        public Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            _logger.LogWarning("PermissionLevel is an enum and cannot be deleted at runtime.");
            return Task.FromResult(new DeleteResponse(false));
        }
    }
}
