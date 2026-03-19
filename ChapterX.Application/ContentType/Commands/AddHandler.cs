using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ContentType.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(ILogger<AddHandler> logger)
        {
            _logger = logger;
        }

        public Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            _logger.LogWarning("ContentType is an enum and cannot be added at runtime.");
            return Task.FromResult(new AddResponse(false));
        }
    }
}
