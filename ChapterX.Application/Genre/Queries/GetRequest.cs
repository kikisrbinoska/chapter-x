using MediatR;

namespace ChapterX.Application.Genre.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
